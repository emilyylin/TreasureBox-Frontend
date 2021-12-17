<script>
    import { Route, Link } from 'svelte-routing';
    import accessDenied from './accessDenied.svelte';
    import { token } from '../api/stores.js';
    import Email from '../pages/EmailPage.svelte'

    export let path;
    export let id;

    $: isAuthenticated = $token;
</script>

{#if isAuthenticated}
    <Route path={path} > <Email id="{id}"/> </Route>

{:else}
    <Route path={path} component={accessDenied} />
{/if}