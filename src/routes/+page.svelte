<script lang="ts">
    import Itemholder from "$lib/Itemholder.svelte";

    export let data;

    import "./+page.less"
</script>


<Itemholder bind:items={data.items}/>