import Link from "next/link";

const links = [
  {
    title: "Homepage",
    path: "/login",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contacts",
    path: "/contacts",
  },
  {
    title: "Blog",
    path: "/posts",
  },
];

const Links = () => {
  return (
    <div>
      {links.map((t) => (
        <Link key={t.title} href={t.path}>
          {t.title}
        </Link>
      ))}
    </div>
  );
};

export default Links;
