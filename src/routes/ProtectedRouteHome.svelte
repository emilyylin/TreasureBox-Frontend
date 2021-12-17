<script>
    import { Route, Link } from 'svelte-routing';
    import accessDenied from './accessDenied.svelte';
    import { token } from '../api/stores.js';
    import Home from '../pages/Home.svelte'

    export let path;
    export let filter;

    $: isAuthenticated = $token;
</script>

{#if isAuthenticated}
    <!-- <Route path={path} component={component}> </Route> -->
    <Route path={path} > <Home filter="{filter}"/> </Route>

{:else}
    <Route path={path} component={accessDenied} />
{/if}