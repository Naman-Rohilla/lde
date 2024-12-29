import { useContext, useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, set, push, get, remove } from "firebase/database";
import { useInfraData } from "../context/infraDataProvider";
import { usePackData } from "../context/packDataProvider";
import { v4 as uuidv4 } from "uuid";
import GridLoader from "react-spinners/GridLoader";
import {
  decryptData,
  isDataExpired,
  encryptData,
} from "../utils/encryptionJson";

export default function Admin() {
  const [userLogin, setUserLogin] = useState(false);
  const [username, setUsername] = useState(false);
  const [dataType, setDataType] = useState("none");
  const [openSelect, setOpenSelect] = useState(false);
  const [write, setWrite] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteItemName, setDeleteItemName] = useState(false);

  const { infraArray, fetchInfra } = useInfraData();
  const { packArray, fetchPack } = usePackData();
  const [refreshKey, setRefreshKey] = useState(0);

  const [loading, setLoading] = useState(true);

  const saveData = async (formData) => {
    setLoading(true);
    const db = getDatabase(app);
    const dbRef = ref(db, "lde/users");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const adminUser = Object.freeze(Object.values(snapshot.val()));

      if (
        adminUser[0].username == formData.username &&
        adminUser[0].password == formData.password
      ) {
        console.log("User logged in");
        const localData = {
          username: adminUser[0].username,
          password: adminUser[0].password,
          expiry: new Date().toISOString(),
        };
        const encryptedData = encryptData(localData);
        if (encryptedData) {
          localStorage.setItem("userData", encryptedData);
        } else {
          console.log("not able to encrypt");
        }
        setUserLogin(true);
        setUsername(adminUser[0].username);
      } else {
        console.log(formData, "formData");
        alert("Wrong credentials");
      }
    } else {
      alert("error");
    }
    setLoading(false);
  };

  let PRODUCT = "Packaging";
  let INFRA = "Infrastructure";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Collected Data:", data);
    await saveData(data);
  };

  async function handleWriteStatus() {
    const writeStatus = !write;
    console.log(!writeStatus, "check");
    setWrite(writeStatus);
  }

  const saveFormData = async (formData) => {
    try {
      const db = getDatabase(app);
      const unique_id = uuidv4();
      const dbRef =
        dataType == INFRA
          ? ref(db, `lde/infrastructure/${unique_id}`)
          : ref(db, `lde/packaging/${unique_id}`);

      await set(dbRef, {
        id: unique_id,
        title: formData.title,
        description: formData.description,
        summary: formData.summary,
        url: formData.url,
      });

      alert("Data and photo saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data: " + error.message);
    }
    await fetchInfra();
    await fetchPack();
  };

  const handleFormSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const formDataImage = new FormData();
    console.log(event.target.fileImage.files[0], "fileImage");
    formDataImage.append("file", event.target.fileImage.files[0]);
    formDataImage.append("upload_preset", "lde-admin"); // Unsigned preset name

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/djdyzefbx/image/upload`,
      {
        method: "POST",
        body: formDataImage,
      }
    );

    const data = await response.json();
    console.log(data.secure_url);

    const formData = {
      title: event.target.title.value,
      description: event.target.description.value,
      summary: event.target.summary.value,
      url: data.secure_url,
    };

    await saveFormData(formData);
    event.target.reset();
    setLoading(false);
  };

  function handlePopup(id, name) {
    setOpenPopup(true);
    setDeleteId(id);
    setDeleteItemName(name);
  }

  const handleDelete = async () => {
    setLoading(true);
    const db = getDatabase(app);

    try {
      console.log("Started deletion process...");

      if (dataType === INFRA) {
        await remove(ref(db, `lde/infrastructure/${deleteId}`));
      } else if (dataType === PRODUCT) {
        await remove(ref(db, `lde/packaging/${deleteId}`));
      }

      await fetchInfra();
      await fetchPack();

      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item: " + error.message);
    }

    setOpenPopup(false);
    setLoading(false);
  };

  function handleCancel() {
    setOpenPopup(false);
    setDeleteId("");
    setDeleteItemName("");
  }

  useEffect(() => {
    async function handleLogin() {
      setLoading(true);
      const encryptedData = localStorage.getItem("userData");
      if (encryptedData) {
        const decryptedData = decryptData(encryptedData);

        if (decryptedData) {
          if (!isDataExpired(decryptedData.expiry)) {
            const db = getDatabase(app);
            const dbRef = ref(db, "lde/users");
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
              const adminUser = Object.freeze(Object.values(snapshot.val()));
              if (
                adminUser[0].username == decryptedData.username &&
                adminUser[0].password == decryptedData.password
              ) {
                setUserLogin(true);
                setUsername(decryptedData.username);
              }
            }
          } else {
            localStorage.removeItem("userData");
            alert("Please Login Again! Tokem has expired");
          }
        }
      }
      setLoading(false);
    }

    handleLogin();
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            zIndex: 9999,
          }}
          className="h-screen w-full fixed top-0 lef-0 bg-gray-800 bg-opacity-80 flex justify-center items-center text-white"
        >
          <GridLoader
            color={"white"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="shadow-2xl"
          />
        </div>
      )}
      {openPopup && (
        <div
          style={{
            zIndex: 999,
          }}
          className="h-screen w-full fixed top-0 left-0 bg-gray-800 bg-opacity-80 flex justify-center items-center shadow-md"
        >
          <div className="h-40 w-80 bg-white flex flex-col justify-center items-center space-y-7 rounded-lg">
            <>
              <span className="flex px-6">
                Are you sure you want to delete {deleteItemName}?
              </span>
              <div className="flex space-x-5">
                <span
                  onClick={() => handleCancel()}
                  className="px-2 py-2 hover:scale-105 hover:duration-200 ease-in-out bg-red-600 text-white cursor-pointer"
                >
                  cancel
                </span>
                <span
                  className="px-8 py-2 hover:scale-105 hover:duration-200 ease-in-out bg-primary text-white cursor-pointer"
                  onClick={() => handleDelete()}
                >
                  ok
                </span>
              </div>
            </>
          </div>
        </div>
      )}
      {!userLogin ? (
        <div class="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              class="mx-auto h-10 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <span className="">Required logo</span>
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              class="space-y-6"
              action="processing"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  for="email"
                  class="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div class="mt-2">
                  <input
                    type="username"
                    name="username"
                    id="username"
                    autocomplete="username"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  {/* <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                </div>
                <div class="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div class="flex h-auto flex-col justify-center py-12 container pt-28">
          <form action="processing" method="POST" onSubmit={handleFormSubmit}>
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
                <span className="w-full text-6xl text-primary ">
                  Welcome, {username.toUpperCase()}
                </span>

                <div className="flex items-center justify-between">
                  <p class="mt-5 text-sm/6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div
                      onClick={() => handleWriteStatus()}
                      class="relative w-11 text-white text-right h-6 text-xs flex items-center justify-end bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                    ></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {write ? "Write" : "Read"}
                    </span>
                  </label>
                </div>
                <div className="pt-5">
                  <label
                    id="listbox-label"
                    class="block text-sm/6 font-medium text-gray-900"
                  >
                    Select Type of data you want to add.
                  </label>
                  <div class="relative mt-2">
                    <button
                      type="button"
                      class="grid w-full cursor-default grid-cols-1 border-gray-300 border rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-primary focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      aria-haspopup="listbox"
                      aria-expanded="true"
                      aria-labelledby="listbox-label"
                      onClick={() => setOpenSelect(!openSelect)}
                    >
                      <span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <span class="block truncate">{dataType}</span>
                      </span>
                      <svg
                        class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>

                    {openSelect && (
                      <ul
                        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden sm:text-sm"
                        tabindex="-1"
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3"
                      >
                        <li
                          class="relative cursor-default py-2 pr-9 pl-2 text-gray-900 select-none hover:bg-primary hover:text-white mx-4 rounded-lg"
                          id="listbox-option-0"
                          role="option"
                          onClick={() => {
                            setDataType(PRODUCT);
                            setOpenSelect(false);
                          }}
                        >
                          <div class="flex items-center">
                            <span class="block truncate font-normal">
                              Packaging
                            </span>
                          </div>
                        </li>
                        <li
                          class="relative cursor-default py-2 pr-9 pl-2 text-gray-900 select-none hover:bg-primary hover:text-white mx-4 rounded-lg"
                          id="listbox-option-0"
                          role="option"
                          onClick={() => {
                            setDataType(INFRA);
                            setOpenSelect(false);
                          }}
                        >
                          <div class="flex items-center">
                            <span class="block truncate font-normal">
                              Infrastructure
                            </span>
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                {dataType !== "none" && write && (
                  <div class="mt-10  gap-y-8 col-span-full">
                    <div class="sm:col-span-4">
                      <label
                        for="title"
                        class="block text-sm/6 font-medium text-gray-900"
                      >
                        {dataType} title
                      </label>
                      <div class="mt-2">
                        <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                          <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                            title
                          </div>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="sm:col-span-4 mt-10">
                      <label
                        for="description"
                        class="block text-sm/6 font-medium text-gray-900"
                      >
                        {dataType} description
                      </label>
                      <div class="mt-2">
                        <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                          <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                            description
                          </div>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            required
                            class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mt-10 col-span-full">
                      <label
                        for="summary"
                        class="block text-sm/6 font-medium text-gray-900"
                      >
                        Summary
                      </label>
                      <div class="mt-2">
                        <textarea
                          name="summary"
                          id="summary"
                          required
                          rows="3"
                          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        ></textarea>
                      </div>
                      <p class="mt-3 text-sm/6 text-gray-600">
                        Write a few sentences about packaging.
                      </p>
                    </div>

                    <div class="sm:col-span-4 mt-10">
                      <label
                        for="fileImage"
                        class="block text-sm/6 font-medium text-gray-900"
                      >
                        {dataType} Cover photo URL
                      </label>
                      <div class="mt-2">
                        <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                          <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                            url
                          </div>
                          <input
                            type="file"
                            name="fileImage"
                            id="fileImage"
                            required
                            class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {dataType == INFRA && !write && (
                  <div
                    key={refreshKey}
                    className="h-auto max-h-[540px] mt-10 space-y-10 overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-visible"
                  >
                    {infraArray.map((ia, index) => (
                      <div className="flex space-x-10 w-full border-bottom border-gray-300">
                        <span>
                          <img src={ia.url} className="h-40 w-48" />
                        </span>
                        <div className="flex flex-col w-full">
                          <span className="font-bold">{ia.title}</span>
                          <span className="pt-2">{ia.description}</span>
                          <span className="pt-4 w-full flex flex-wrap">
                            {ia.summary}
                          </span>
                        </div>
                        <span className="cursor-pointer float-right flex justify-end pr-10">
                          <span
                            onClick={() => handlePopup(ia.id, ia.title)}
                            className="bg-red-500 h-10 px-4 hover:scale-105 hover:duration-200  text-white rounded-lg flex items-center"
                          >
                            Delete
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {dataType == PRODUCT && !write && (
                  <div
                    key={refreshKey}
                    className="h-auto max-h-[540px] mt-10 space-y-10 overflow-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-visible"
                  >
                    {packArray.map((pa, index) => (
                      <div className="flex space-x-10 w-full border-bottom border-gray-300">
                        <span>
                          <img src={pa.url} className="h-40 w-48" />
                        </span>
                        <div className="flex flex-col w-full">
                          <span className="font-bold">{pa.title}</span>
                          <span className="pt-2">{pa.description}</span>
                          <span className="pt-4 w-full flex flex-wrap">
                            {pa.summary}
                          </span>
                        </div>
                        <span className="cursor-pointer float-right flex justify-end">
                          <span
                            onClick={() => handlePopup(pa.id, pa.title)}
                            className="bg-red-500 h-10 px-4 hover:scale-105 hover:duration-200  text-white rounded-lg flex items-center"
                          >
                            Delete
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {dataType !== "none" && write && (
              <div class="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  class="text-sm/6 font-semibold text-gray-900"
                  onClick={(event) => {
                    const formElement = event.target.closest("form");
                    formElement.reset();
                  }}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
}
