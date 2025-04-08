<script lang="ts">
    import { onMount } from 'svelte';
    import { PageManager } from "../PageManager.ts";
    import Home from "../Home.svelte";
    import Preflight from "../Preflight.svelte";
  import { goto } from '$app/navigation';

    const pages = ["Home", "Preflight"];
    const pm = new PageManager(pages);

    onMount(() => {
        const options = {
            root: null, // Observe within the viewport
            threshold: 0.6 // Adjust threshold as needed
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pm.currentPage = entry.target.id;
                    goto(`#${pm.currentPage}`)
                    console.info("Current page updated to:", pm.currentPage);
                }
            });
        }, options);

        // Observe each page div by id
        pages.forEach(page => {
            const el = document.getElementById(page);
            if (el) observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    });
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
</style>

<div class="w-screen h-[2vh] bg-slate-400 z-10 overflow-hide">
    <div class="h-[2vh] bg-red-400" style="width: {pages.length}%"></div>
</div>

<div class="h-[98vh] overflow-scroll snap-y snap-mandatory scroll-smooth">
    <div id="Home" class="h-screen flex flex-col p-6 snap-center">
        <Home />
    </div>
    
    <div id="Preflight" class="h-screen flex flex-col p-6 snap-center">
        <Preflight />
    </div>
</div>





