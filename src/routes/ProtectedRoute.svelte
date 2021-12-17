<script>
    import { Route, Link } from 'svelte-routing';
    import accessDenied from './accessDenied.svelte';
    import { token } from '../api/stores.js';

    export let path;
    export let component;

    $: isAuthenticated = $token;
</script>

{#if isAuthenticated}
    <Route path={path} component={component}> </Route>
{:else}
    <Route path={path} component={accessDenied} />
{/if}