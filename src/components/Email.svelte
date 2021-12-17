<script>
    import { onMount, afterUpdate } from 'svelte';
    import '../styles/email.css';
    import { userEmail } from '../api/stores.js';
    import { FontAwesomeIcon } from 'fontawesome-svelte';
    import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';
    import { faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
    import { faTrash as fasTrash} from '@fortawesome/free-solid-svg-icons';
    import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';
    import { navigate} from 'svelte-routing';
    import { star, deleted, getUpload, listUploads, getUploadFile } from '../api/uploads.js';

    let file;
    let upload=[];
    export let id;
    let email;

    let sender="Sick Kids";
    let senderEmail="sickkids.org";
    let emailBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, enim nulla ut orci quis. Sed dapibus malesuada volutpat turpis morbi rutrum sed sollicitudin. Enim orci sagittis, consectetur ut ac in aliquet. Lectus morbi aliquet in orci congue suscipit vitae. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, enim nulla ut orci quis. Sed dapibus malesuada volutpat turpis morbi rutrum sed sollicitudin. Enim orci sagittis, consectetur ut ac in aliquet. Lectus morbi aliquet in orci congue suscipit vitae. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, enim nulla ut orci quis. Sed dapibus malesuada volutpat turpis morbi rutrum sed sollicitudin. Enim orci sagittis, consectetur ut ac in aliquet. Lectus morbi aliquet in orci congue suscipit vitae.";
    

    onMount(async () => {
        let temp=getUpload(id);
        temp.then(function(result) {
            upload=result;
        })
        userEmail.subscribe(value => {email = value;});
	});

    function deleteEmail () {
        deleted(id, true);
        navigate('/dashboard/all');
    }

    function starEmail (bool) {
        star(id, bool);
        let temp=getUpload(id);
        temp.then(function(result) {
            upload=result;
        })
    }

</script>

<div class="email-container">
    <div class="back-to-dashboard" on:click={()=>navigate('/dashboard/all')}>
        <FontAwesomeIcon icon={faArrowLeft} class="email-icon" size="m"/>
        <div class="email-all-files">Back</div>
    </div>
    <div class="email-content">
        <div class="email-title-row"> 
            <div class="email-title"> {upload.filename} </div>
            <div on:click={()=>{deleteEmail()}} ><FontAwesomeIcon icon={fasTrash} class="email-icon" size="m" /> </div>
            {#if !upload.is_starred} 
                <div on:click={()=>{starEmail(!upload.is_starred)}}> <FontAwesomeIcon icon={farStar} class="email-icon" size="m"/> </div>
            {:else if upload.is_starred}
                <div on:click={()=>{starEmail(!upload.is_starred)}}> <FontAwesomeIcon icon={fasStar} class="email-icon" size="m"/> </div>
            {/if}
        </div>

        <div class="sender-row">
            <div class="sender-email"> <b>{sender}</b> ({senderEmail})</div>
            <div class="email-time"> {upload.time} </div>
        </div>
        <div class="user-email"> to {email} </div>
        <div class="email-body"> {emailBody} </div>
        <div class="email-underline"> </div>
        {file}
    </div>
</div>