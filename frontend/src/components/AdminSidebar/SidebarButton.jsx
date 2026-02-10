function SidebarButton({ link, name, clickAction }) {
  return (
    <a href={link}>
      <div onClick={clickAction} className="p-3 text-center hover:bg-amber-500">
        {name}
      </div>
    </a>
  );
}

export default SidebarButton;
