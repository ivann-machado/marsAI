function SidebarButton({ link, name }) {
  return (
    <a href={link}>
      <div className="p-3 text-center hover:bg-amber-500">{name}</div>
    </a>
  );
}

export default SidebarButton;
