<script>
	import "../styles/signinup.css";
    import {userEmail} from "../api/stores";

    let emailValue = '';

    userEmail.subscribe(value => {
		emailValue = value;
        // console.log(emailValue);
	});

</script>

<div class="login-container">
	<div class="login-background-lhs">
		<p style="font-weight:bold">Tax Vault</p>
		<p>All your donations, <br> In one place.</p>
		<p>Simplify your taxes.</p>
	</div>

	<div class="login-background-rhs">
		<p class="signin-h1">Thank you for signing up!</p>
        <p class="signin-body">Please open the verification link sent to <br>{emailValue} </p>
	</div>
</div>