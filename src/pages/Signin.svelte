<script>

	import { userEmail, token, userToken } from "../api/stores";
	import '../styles/signinup.css';
	import { Link, navigate } from 'svelte-routing';

	// let email = '';
	// let password = '';
	let email = 'user6@business.com';
	let password = 'password';
	let result = null;

	localStorage.clear();
	token.set(localStorage.getItem('token'));
	
	async function signin  () {

		const res = await fetch('http://localhost:4000/api/users/signin', {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			body: JSON.stringify({
				email,
                password
			})
		})
		
		const json = await res.json()

		if (json != "") {
			localStorage.setItem('token', '1');
        	token.set(localStorage.getItem('token'));
			userEmail.update(n => json.email);
			userToken.update(n => json.token);
			navigate('/dashboard/all');

		} else {
			console.log("oopsies wrong login");
		}
	}

	function signup() {
		navigate('/signup', { replace: true });
	}

</script>

<div class="login-container">
	<div class="login-background-lhs">
		<p style="font-weight:bold">Tax Vault</p>
		<p>All your donations, <br> In one place.</p>
		<p>Simplify your taxes.</p>
	</div>

	<div class="login-background-rhs">
		<div class="login-square" id="square-signin">
			<p style="font-weight:bold; font-size:24px; margin-bottom:0"> Sign In </p>
			<div class="login-input-and-button">
				<input bind:value={email} type="text" class="login-input" placeHolder="Email" />
				<input bind:value={password} type="password" class="login-input" placeHolder="Password"/>
				<button type="button" class="login-button" on:click={signin}>
					Sign In
				</button>
			</div>
		</div>
		<div class="square-bottom-text">Don't have an account? &nbsp;
			<div class="no-account-link" on:click={signup}> Sign Up </div>
		</div>
		<!-- <Link to="dashboard">Go to Dashboard</Link> -->
	</div>
</div>