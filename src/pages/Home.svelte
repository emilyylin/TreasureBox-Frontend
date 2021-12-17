<script>
    import Dashboard from "../components/Dashboard.svelte";
    import Header from '../components/Header.svelte';
    import SideNavBar from '../components/SideNavbar.svelte';

    export let filter="";
    // export let component;
    // export let id;

    // afterUpdate(async () => {
    //     console.log("filter:" + filter);
    // });
</script>

<div class="home-container">
    <Header/>
    <SideNavBar filter={filter}/>
    <Dashboard filter={filter}/>
</div>

<style>
	.home-container{
		overflow:hidden;
	}
</style>