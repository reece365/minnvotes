<style>
    @import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>

<script lang="ts">
    import { slide } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { swipe } from "svelte-gestures";
    import { goto } from "$app/navigation"

    let { children, currentPage } = $props();

    const pageOrder = [
        "/",
        "/pre-flight"
    ]

    function get_next_page(): string {
        const currentPageIndex = pageOrder.findIndex((element) => element == currentPage);
        
        if (currentPageIndex != -1 && (currentPageIndex + 1) != pageOrder.length) {
            return pageOrder[currentPageIndex + 1]
        } else {
            return currentPage
        }
    }

    function get_previous_page(): string {
        const currentPageIndex = pageOrder.findIndex((element) => element == currentPage);
        
        if (currentPageIndex != -1 && currentPageIndex != 0) {
            return pageOrder[currentPageIndex - 1]
        } else {
            return currentPage
        }
    }

    console.log(get_next_page())
    console.log(get_previous_page)
</script>

<svelte:body 
    use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60})} 
    on:swipe={(e) => {
        if (e.detail.direction == "top") {
            goto(get_next_page())
        } else if (e.detail.direction == "bottom") {
            goto(get_previous_page())
        }
    }}></svelte:body>

<div class="h-6 bg-slate-400">
    <div class={`h-10 bg-red-400`}></div>
</div>
<div class="bg-slate-200 p-6 h-screen w-screen flex flex-col"
    in:slide={{duration: 300, easing: cubicInOut}} 
    out:slide={{duration: 300, easing: cubicInOut}}
>
    {@render children()}
</div>