<script>
    import '../styles/signinup.css';
	// let email = '';
	// let password = '';
	let password2 ='password';
	let email = 'user6@business.com'
	let password = 'password'
	import { Link, navigate } from 'svelte-routing';
	import { token, userEmail, userToken } from '../api/stores.js';

	let result = null;
	
	localStorage.clear();
	token.set(localStorage.getItem('token'));

	async function signup  () {

		const res = await fetch('http://localhost:4000/api/users/signup', {
			method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
			body: JSON.stringify({user:{email,password, password2}})
		})
		
		const json = await res.json()
		result = JSON.stringify(json)

		if (json.hasOwnProperty('email')) {
			localStorage.setItem('token', '1');
        	token.set(localStorage.getItem('token'));
			userEmail.update(n => json.email);
			userToken.update(n => json.token);
			navigate('/emailverified', { replace: true });

		} else {
			console.log("oopsies wrong login");
		}
	}

	function signin() {
		navigate('/');
	}
</script>

<div class="login-container">
	<div class="login-background-lhs">
		<p style="font-weight:bold">Tax Vault</p>
		<p>All your donations, <br> In one place.</p>
		<p>Simplify your taxes.</p>
	</div>

	<div class="login-background-rhs">
		<div class="login-square" id="square-signup">
			<p style="font-weight:bold; font-size:24px; margin-bottom:0"> Sign Up </p>
			<div class="login-input-and-button">
				<input bind:value={email} type="text" class="login-input" placeHolder="Email" />
				<input bind:value={password} type="password" class="login-input" placeHolder="Password"/>
				<input bind:value={password2} type="password" class="login-input" placeHolder="Confirm Password"/>
				<button type="button" class="login-button" on:click={signup}>
					Sign Up
				</button>
			</div>
		</div>
		<div class="square-bottom-text">Already have an account? &nbsp;
			<div class="no-account-link" on:click={signin}> Sign In </div>
		</div>
	</div>
</div>
