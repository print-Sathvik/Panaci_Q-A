import Header from "./components/Header";

export default function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-gray-100">
      <Header />
      {props.children}
    </div>
  );
}
