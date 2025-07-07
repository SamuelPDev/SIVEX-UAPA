import React, { useCallback } from "react";

interface ClickEvent {
  preventDefault(): void;
  target: HTMLElement & { getAttribute(name: string): string | null };
}

interface SubItem {
  id: string;
  label: string;
  link: string;
  parentId: string;
}

interface MenuItem {
  id?: string;
  label: string;
  icon?: string;
  link?: string;
  click?: (e: ClickEvent) => void;
  stateVariables?: boolean;
  subItems?: SubItem[];
  isHeader?: boolean;
}

const Navdata = () => {
  const [isDashboardOpen, setIsDashboardOpen] = React.useState<boolean>(false);

  const updateIconSidebar = useCallback((e: ClickEvent) => {
    const subItems = e.target.getAttribute("sub-items");
    if (!subItems) return;

    const ul = document.getElementById("two-column-menu");
    const iconItems = ul?.querySelectorAll(".nav-icon.active");

    iconItems?.forEach((item) => {
      item.classList.remove("active");
      const id = item.getAttribute("sub-items");
      if (id) {
        const menuElement = document.getElementById(id);
        menuElement?.parentElement?.classList.remove("show");
      }
    });

    e.target.classList.add("active");
  }, []);

  const toggleDashboard = useCallback(() => {
    setIsDashboardOpen((prev) => !prev);
    document.body.classList.remove("twocolumn-panel");
  }, []);

  const menuItems: MenuItem[] = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Tipos de proyectos",
      icon: "ph-book-open",
      link: "/#",
      click: (e: ClickEvent) => {
        e.preventDefault();
        toggleDashboard();
        updateIconSidebar(e);
      },
      stateVariables: isDashboardOpen,
      subItems: [
        {
          id: "extensionista",
          label: "Extensionista",
          link: "#",
          parentId: "dashboard",
        },
        {
          id: "voluntariado",
          label: "Voluntariado",
          link: "#",
          parentId: "dashboard",
        },
      ],
    },
  ];

  return {
    props: {
      children: menuItems
    }
  };
};

export default Navdata;