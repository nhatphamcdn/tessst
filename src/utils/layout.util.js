/**
 * Initialize the menu according to the route
 * @param routes
 * @param filter
 * @returns {*} Menu list
 */
export const createMenus = (routes, filter) => {
  const menus = [];
  if (filter) {
    routes = routes.filter((i) => filter(i));
  }
  routes.forEach((route) => {
    if (route.path === "/" && route.children) {
      createMenus(route.children).forEach((item) => {
        menus.push(item);
      });
    } else {
      let children;
      if (route.children) {
        children = createMenus(route.children);
      }

      const meta = route;
      menus.push({
        text: meta && meta.text ? meta.text : route.resourceName,
        icon: meta ? meta.icon : "",
        path: route.path,
        children,
      });
    }
  });

  return menus;
};

/**
 * Create a default top view
 * @param routes
 * @param filter
 * @param barArray
 */
export const createDefaultVisitedBar = (routes, filter, barArray = []) => {
  if (filter) {
    routes.filter((i) => filter(i));
  }
  routes.forEach((route) => {
    if (route.children) {
      createDefaultVisitedBar(route.children, null, barArray);
    } else {
      const meta = route.meta;
      if (meta && meta.defaultVisited) {
        barArray.push({
          name: meta && meta.text ? meta.text : route.name,
          path: route.path,
        });
      }
    }
  });
  return barArray;
};

/**
 * Array to tree structure
 * @param list Array
 * @param tree
 * @param parentId
 */
export const listToTree = (list, tree, parentId) => {
  function assertParentId(item, parentId) {
    if (parentId == null) {
      return item.parentId === null || item.parentId === undefined;
    } else {
      return item.parentId === parentId;
    }
  }

  list.forEach((item) => {
    if (assertParentId(item, parentId)) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: [],
      };

      listToTree(list, child.children, item.id);

      if (child.children.length <= 0) {
        delete child.children;
      }

      tree.push(child);
    }
  });
};

/**
 *
 * Generate breadcrumbs based on the current route
 * @param {*} currentRoute
 * @param {*} list
 * @param {*} index
 */
export const createBreadCrumbs = (currentRoute, list = [], index = 0) => {
  if (currentRoute) {
    let text = currentRoute.meta
      ? currentRoute.meta.text
      : currentRoute.resourceName || currentRoute.name;
    list.push({
      text,
      disabled: index === 0 || currentRoute.path === null,
      href: currentRoute.path,
      index,
    });

    if (currentRoute.meta && currentRoute.meta.parent) {
      createBreadCrumbs(currentRoute.meta.parent, list, ++index);
    }
  }
  list.sort((o1, o2) => o2.index - o1.index);
  return list;
};
