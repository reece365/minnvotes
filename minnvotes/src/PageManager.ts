import { goto } from "$app/navigation";

export { PageManager };

class PageManager {
    private _pages: string[];
    private _currentPage: string; // Add this line

    constructor(pages: string[]) {
        this._pages = pages;
        this._currentPage = "Home"; // Initialize _currentPage here
    }

    set currentPage(currentPage: string) {
        this._currentPage = currentPage;
    }

    get currentPage(): string {
        return this._currentPage;
    }

    go_to_page(page: string) {
        if (this._pages.includes(page)) { 
            this.currentPage = page;
            goto(page);
        } else {
            console.error(`Couldn't find page "${page}"`);
        }
    }

    get_progress(): number {
        if (this._pages.includes(this._currentPage)) { // Use .includes instead of 'in'
            return (this._pages.findIndex((e) => e === this._currentPage) / this._pages.length);
        } else {
            return 0;
        }
    }
}
