function setupMobileNavBar() {
    let navBarMenuButton = document.getElementById("nav_bar_menu_button");
    navBarMenuButton.addEventListener("click", () => {
        let navBarMenu = document.getElementById("nav_bar_menu");
        if (navBarMenu.hidden) {
            navBarMenu.hidden = false;
        } else {
            navBarMenu.hidden = true;
        }
    });
}

export {setupMobileNavBar};
