function SidebarButton({ link, name, clickAction, type }) {
  return (
    <a href={link}>
      <div
        onClick={clickAction}
        className={
          type === "logout"
            ? "p-3 bg-red-800 text-center hover:bg-amber-500"
            : "p-3 text-center hover:bg-amber-500"
        }
      >
        {name}
      </div>
    </a>
  );
}

export default SidebarButton;
