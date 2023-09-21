import { ActiveLink } from "raviger";

export default function Header() {
  return (
    <div className="flex gap-2 w-full border-b-2 border-gray-300">
      <div className="float-right w-full pl-1 pr-10">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ]
          .reverse()
          .map((link) => (
            <ActiveLink
              key={link.url}
              href={link.url}
              className="p-2 px-4 m-2 mx-4 float-right"
              exactActiveClass="border-b-4 border-purple-600"
            >
              {link.page}
            </ActiveLink>
          ))}
      </div>
    </div>
  );
}
