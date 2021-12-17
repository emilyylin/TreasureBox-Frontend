<script>
    import '../styles/sidenavbar.css';
    import { FontAwesomeIcon } from 'fontawesome-svelte';
    import { faFile as fasFile} from '@fortawesome/free-solid-svg-icons';
    import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
    import { faTrash as fasTrash} from '@fortawesome/free-solid-svg-icons';
    import { faClock as farClock } from '@fortawesome/free-regular-svg-icons';
    import { faAngleDown as fasAngleDown } from '@fortawesome/free-solid-svg-icons';
    import { userEmail } from '../api/stores.js';
    import { navigate} from 'svelte-routing';
    import { Menu, Button, List, ListItem, Checkbox, MaterialApp } from 'svelte-materialify';

    export let filter;

    let emails=["johnsmith@gmail.com", "johnsmith@yahoo.ca", "johnsmith@outlook.com"];
    let emailValue ='';
    let isAll=true, isRecent=false, isStarred=false, isDeleted=false;

	userEmail.subscribe(value => {
		emailValue = value;
	});

    function filterFiles (type) {
        // console.log("type: " + type);
        filter=type;

        switch(type) {
            case "all":
                isAll=true;
                isRecent=false;
                isStarred=false;
                isDeleted=false;
                navigate('/dashboard/all');
                break;
            case "recent":
                navigate('/dashboard/recent');
                isAll=false;
                isRecent=true;
                isStarred=false;
                isDeleted=false;
                break;
            case "starred":
                navigate('/dashboard/starred');
                isAll=false;
                isRecent=false;
                isStarred=true;
                isDeleted=false;
                break;
            case "deleted":
                navigate('/dashboard/deleted');
                isAll=false;
                isRecent=false;
                isStarred=false;
                isDeleted=true;
                break;
        }
    }

</script>

<div class="sidenavbar-background">
    <div class="d-flex justify-center">
        <div class ="sidenav-email">
            <Menu>
                <div slot="activator" class="sort-by-text">
                    {emailValue}
                    <FontAwesomeIcon icon={fasAngleDown} class="sidenav-icon" size="m"/>
                </div>
                <List>
                {#each emails as email}
                <ListItem >{email}</ListItem>
                {/each}
                </List>
            </Menu>
        </div>
    </div>

    <div class="sidenav-options">
        
        {#if isAll}
        <div class="sidenav-option" id="clicked" on:click={()=>{filterFiles("all")}}>
            <FontAwesomeIcon icon={fasFile} class="sidenav-icon" size="m"/>
            My Emails
        </div>
        {:else}
        <div class="sidenav-option" on:click={()=>{filterFiles("all")}}>
            <FontAwesomeIcon icon={fasFile} class="sidenav-icon" size="m"/>
            My Emails
        </div>
        {/if}

        {#if isRecent}
            <div class="sidenav-option" id="clicked" on:click={()=>{filterFiles("recent")}}>
                <FontAwesomeIcon icon={farClock} class="sidenav-icon" size="m"/>
                Recent
            </div>
        {:else}
            <div class="sidenav-option" on:click={()=>{filterFiles("recent")}}>
                <FontAwesomeIcon icon={farClock} class="sidenav-icon" size="m"/>
                Recent
            </div>
        {/if}

        {#if isStarred}
            <div class="sidenav-option" id="clicked" on:click={()=>{filterFiles("starred")}}>
                <FontAwesomeIcon icon={fasStar} class="sidenav-icon" size="m"/>
                Starred
            </div>
        {:else}
            <div class="sidenav-option" on:click={()=>{filterFiles("starred")}}>
                <FontAwesomeIcon icon={fasStar} class="sidenav-icon" size="m"/>
                Starred
            </div>
        {/if}

        {#if isDeleted}
            <div class="sidenav-option" id="clicked" on:click={()=>{filterFiles("deleted")}}>
                <FontAwesomeIcon icon={fasTrash} class="sidenav-icon" size="m"/>
                Deleted
            </div>
        {:else}
            <div class="sidenav-option" on:click={()=>{filterFiles("deleted")}}>
                <FontAwesomeIcon icon={fasTrash} class="sidenav-icon" size="m"/>
                Deleted
            </div>
        {/if}

    </div>

    <div class="add-inbox">
        + Add Account
    </div>
    
</div>