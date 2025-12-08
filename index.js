function main() {
    let button = document.getElementById("nav_bar_mobile_button");
    button.addEventListener("click", () => {
        let menu = document.getElementById("nav_bar_mobile_menu");
        if (menu.hidden) {
            menu.hidden = false;
        } else {
            menu.hidden = true;
        }
    });
}

main();
