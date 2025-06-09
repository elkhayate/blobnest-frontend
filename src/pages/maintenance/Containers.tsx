import { useGetContainers } from "@/api/containers/queries";

export default function Containers() {
  const { data: containers } = useGetContainers();
  console.log(containers);
  return <div>Containers Page</div>;
} 