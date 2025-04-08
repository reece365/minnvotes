<script>

  import { goto } from "$app/navigation";

</script>

<span class="text-lg font-[Funnel_Display] p-1">Hey Minnesota,</span>
<span class="text-8xl font-bold font-[Funnel_Display] text-pretty">Make<br/>a plan<br/>to <span class="italic">vote</span></span>
<button class="bg-red-500 mt-8 p-2 text-white drop-shadow-md transition duration-300 hover:drop-shadow-none hover:bg-red-600" onclick={() => {goto("#Preflight")}}>
    <div class="flex flex-row place-content-between p-2">
        <span class="font-[Funnel Display]">Let's do it</span>
        <span class="material-symbols-outlined">swipe_up</span>
    </div>
</button>


