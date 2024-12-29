import { useLocation } from "react-router-dom";

export default function InfraById() {
  const location = useLocation();
  const { data } = location.state || {};

  console.log(data, "Data");

  return <></>;
}
