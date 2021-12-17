<script>
  
    import { onMount, afterUpdate, beforeUpdate } from 'svelte';
    import '../styles/dashboard.css';
    import { FontAwesomeIcon } from 'fontawesome-svelte';
    import { faStar as farStar} from '@fortawesome/free-regular-svg-icons';
    import { faStar as fasStar} from '@fortawesome/free-solid-svg-icons';
    import { faTrash as fasTrash} from '@fortawesome/free-solid-svg-icons';
    import { faTrashRestore as fasTrashRestore} from '@fortawesome/free-solid-svg-icons';
    import { Menu, Button, List, ListItem, Checkbox, MaterialApp } from 'svelte-materialify';
    import { navigate } from 'svelte-routing';
    import { star, deleted, getUpload, listUploads, getUploadFile } from '../api/uploads.js';
       
    let uploads = ["",""];
    let uploadsOnMount=[];
    let selected = [];
    let numUploads;
    let description = "Thank you for donating!";

    let sortFlag=false;

    export let filter;
    // let prevFilter=filter;

    let sortbycols=["Date", "File Name", "Time", "Unread"];
    let sbci=0;
    let sortBy = {col: "id", ascending: true};

    onMount(async () => {
      let temp=listUploads();
      temp.then(function(result) {
        uploadsOnMount=result;
        uploads = uploadsOnMount;
      })
      calculateNumUploads(uploadsOnMount);
      filterUploads();
    });

    afterUpdate(async () => {
      if (!sortFlag) {
        filterUploads();
        sortFlag=false;
      }
    });

    function navigateToEmailPage (id) {
      let emailRoute="".concat("/email/",id);
      navigate(emailRoute);
    }

    function changeSortByCaption (sortNum) {
      sbci = sortNum;

      switch (sbci) {
        case 0:
          sort("date");
          break;
        case 1:
          sort("filename");
          break;
        case 2:
          sort("time");
          break;
        case 3:
          console.log("sort by unread");
          break;
        default:
          console.log("uh on in change sort by caption")
          break;
      }

    }

    function filterUploads () {
      uploads=[];
        if (filter=="all" || filter=="recent" || filter=="") {
        uploads=[];
        for (let i=0; i < uploadsOnMount.length; i++) {
          if (!uploadsOnMount[i].is_deleted) {
            numUploads++;
            uploads.push(uploadsOnMount[i]);
          }
        }
          calculateNumUploads(uploads);
          if (filter=="recent") {
            sort("recent_access_time");
          }
        }
        else if (filter=="starred") {
          for (let i=0; i < uploadsOnMount.length; i++) {
            if (uploadsOnMount[i].is_starred) {
              uploads.push(uploadsOnMount[i]);
            }
          }
          calculateNumUploads(uploads);
        } else if (filter=="deleted") {
          numUploads=0;
          uploads=[];
          for (let i=0; i < uploadsOnMount.length; i++) {
            if (uploadsOnMount[i].is_deleted) {
              numUploads++;
              uploads.push(uploadsOnMount[i]);
            }
          }
        } else {
          console.log(filter);
        }
        return uploads;
    }

    $: sort = (column) => {

      if (sortBy.col == column) {
        sortBy.ascending = !sortBy.ascending
      } else {
        sortBy.col = column
        sortBy.ascending = true
      }
      
      let sortModifier = (sortBy.ascending) ? 1 : -1;
      
      let sort = (a, b) => 
        (a[column] < b[column]) 
        ? -1 * sortModifier 
        : (a[column] > b[column]) 
        ? 1 * sortModifier 
        : 0;
		
      uploads = uploads.sort(sort);
      sortFlag=true;
    }

    function calculateNumUploads (temp) {
      numUploads = 0;
      for (let i=0; i < temp.length; i++) {
        //if page = deleted AND uploads is deleted
        if (!temp[i].is_deleted) {
          numUploads++;
        }
      }
    }

    function starUpload (id, new_value) {
      if (filter != "deleted") {
        star(id, new_value);
        let temp=listUploads();
        temp.then(function(result) {
          uploadsOnMount=result;
        })
        uploads=uploadsOnMount;
        filterUploads();
      }
    }

    function deleteUpload(id, new_value) {
      deleted(id, new_value);
      let temp=listUploads();
      temp.then(function(result) {
        uploadsOnMount=result;
      })
      uploads=uploadsOnMount;
      filterUploads();
    }

    function deleteSelected (newValue) {
      for (let i = 0; i < uploads.length; i++) {
        for (let j=0; j < selected.length; j++) {
          if (uploads[i].id == selected[j]) {
            deleteUpload(uploads[i].id, newValue)
            if (newValue==true) {
              starUpload(uploads[i].id, false)
            }
          }
        }
      }
      selected=[];
    }
   
</script>

<main>
    <div class="dashboard-container">
    <div class="dashboard-all-files-row">
      <div class="dashboard-all-files"> All Files ({numUploads}) </div>
      <div class="d-flex justify-center">
        <Menu>
          <div slot="activator" class="sort-by-text">
            Sort by&nbsp; <div style="color:#2c6dcd">{sortbycols[sbci]} </div>
          </div>
          <List>
            <ListItem on:click={()=>{changeSortByCaption (0)}}>Date</ListItem>
            <ListItem on:click={()=>{changeSortByCaption (1)}}> File Name </ListItem>
            <ListItem on:click={()=>{changeSortByCaption (2)}}>Time</ListItem>
            <ListItem on:click={()=>{changeSortByCaption (3)}}>Unread</ListItem>
          </List>
        </Menu>
      </div>
    </div>
    <table class="table table-bordered" id="table-styling">
        {#if selected.length!=0} 
          <thead>
            <tr class="table-headers" id="selected">
                <th style="font-weight:300" on:click={()=>{sort("date")}}>Subject</th>
                <th style="font-weight:300; color: #2C6DCD">Selected ({selected.length})</th>
                {#if filter=="deleted"}
                  <th style="font-weight:300; color: #2C6DCD" on:click={()=>{deleteSelected(false)}}>
                    <FontAwesomeIcon icon={fasTrashRestore} class="delete-icon" size="s"/>
                    Recover
                  </th>
                {:else}
                  <th style="font-weight:300; color: #2C6DCD" on:click={()=>{deleteSelected(true)}}>
                    <FontAwesomeIcon icon={fasTrash} class="delete-icon" size="s"/>
                    Delete
                  </th>
                {/if}
                <th style="font-weight:300" on:click={()=>{sort("date")}}>Date Added</th>
                <th style="font-weight:300" on:click={()=>{sort("time")}}>Time</th>
                <th style="font-weight:300" on:click={()=>{sort("size")}}>Size</th>
              </tr>
          </thead>
        {:else}
          <thead>
            <tr class="table-headers">
              <th style="font-weight:300" on:click={()=>{sort("date")}}>Subject</th>
              <th></th>
              <th style="font-weight:300" on:click={()=>{sort("date")}} >Date Added</th>
              <th style="font-weight:300" on:click={()=>{sort("time")}}>Time</th>
              <th style="font-weight:300" on:click={()=>{sort("size")}}>Size</th>
            </tr>
          </thead>
        {/if}
        <tbody>
          {#if uploads.length!= 0}
           {#each uploads as upload }  
              <tr class="table-body">
                <td> 
                  <input bind:group={selected} value={upload.id} type="checkbox" class="check-box" />
                  <div class="title-and-description">
                    <div class="dashboard-email-title" on:click={()=>{navigateToEmailPage(upload.id)}}>{upload.filename} </div>
                    <div class="dashboard-email-description">{description}</div>
                  </div>
                </td>
                <td>
                  <div class="starred-upload" on:click={()=>starUpload(upload.id, !upload.is_starred)}>
                    {#if filter=="deleted"}
                      <div class="sidenav-icon"></div>
                    {:else if upload.is_starred}
                      <FontAwesomeIcon icon={fasStar} class="sidenav-icon" size="s"/>
                    {:else}
                      <FontAwesomeIcon icon={farStar} class="sidenav-icon" size="s"/>
                    {/if}
                  </div>
                </td>
                <td style="#position: relative; #top: -50%">{upload.date}</td>
                <td>{upload.time}</td>
                {#if upload.size >= 1000000000}
                  <td>{Math.ceil(upload.size/1000000000)} GB</td>
                {:else if upload.size >= 1000}
                  <td>{Math.ceil(upload.size/1000)} MB</td>
                {:else}
                  <td>{upload.size} B</td>
                {/if}
              </tr>
           {/each}
          {:else}
          <p>There are no uploads!</p>
          {/if}
        </tbody>
      </table>
      </div>
</main>