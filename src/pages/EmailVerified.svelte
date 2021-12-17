<script>
import { navigate } from 'svelte-routing';

	import '../styles/signinup.css';

    function login () {
        navigate('/signin');
    }

</script>

<div class="login-container">
	<div class="login-background-lhs">
		<p style="font-weight:bold">Tax Vault</p>
		<p>All your donations, <br> In one place.</p>
		<p>Simplify your taxes.</p>
	</div>

	<div class="login-background-rhs">
		<p class="signin-h1">Your email has been verified!</p>
        <p class="signin-body">You may now log in to your account</p>
        <div on:click={login}><p style="color:#2C6DCD">Log In</p></div>
	</div>
</div>