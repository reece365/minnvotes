export class PageController {
    constructor(currentPage: string) {
        this.currentPage = currentPage;
        this.pageOrder = [
            "/",
            "pre-flight"
        ]
    }

    set pageOrder(value: Array<string>) {
        this.pageOrder = value;
    }

    get pageOrder() {
        return this.pageOrder
    }

    set currentPage(value: string) {
        this.currentPage = value;        
    }

    get currentPage() {
        return this.currentPage;
    }
}