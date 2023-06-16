import useTheme from "@/hooks/useTheme";

function Footer() {
  const links = ["terms of service", "privacy policy", "security", "site map"];
  const { toggleTheme, theme } = useTheme();

  return (
    <footer className="bg-base-200 dark:bg-base-100 px-4 py-5">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-xl text-primary mb-6">BlogLab</h1>
        <ul className="flex flex-col gap-3 mx-auto justify-center items-center md:flex-row">
          {links.map((item) => (
            <li key={item} className="capitalize hover:underline">
              <a href="">{item}</a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex items-center justify-between">
          <div className="form-control w-32">
            <label className="cursor-pointer label">
              <input
                type="checkbox"
                className="toggle toggle-primary toggle-sm"
                checked={theme == "dark"}
                onChange={toggleTheme}
              />
              <span className="label-text">Dark theme</span>
            </label>
          </div>

          <div>
            <a href="https://lourvens.vercle.app" className="link link-primary">
              About me
            </a>
          </div>

          <div>Happy Coding🎉!!!</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
