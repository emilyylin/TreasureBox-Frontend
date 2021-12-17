<script>
    import '../styles/header.css';
    // import ProfilePic from '../../public/pictures/profile_pic.png';
    import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from 'fontawesome-svelte';
    import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
    import { faUserCircle as fasUserCircle } from '@fortawesome/free-solid-svg-icons';
    import { userEmail, token, userToken } from "../api/stores";
    import { Link, navigate } from 'svelte-routing';

    function logout () {
      localStorage.clear();
      userEmail.update(n => "");
			userToken.update(n => "");
			navigate('/', { replace: true });
    }

</script>

<div class="header-background">
      <input class="temp-searchbar" placeholder="Search" />
      <FontAwesomeIcon icon={farBell} class="bell-icon" size="3x"/>
      <div on:click={logout}><FontAwesomeIcon icon={fasUserCircle} class="profile-icon" size="4x"/></div>
      

    <!-- <Searchbar
    searchContainer=".search-list"
    searchIn=".item-title"
    disableButton={!theme.aurora}
  /> -->
</div>
