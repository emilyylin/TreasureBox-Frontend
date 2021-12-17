<script>
	import Signin from "./Signin.svelte";
	import Signup from "./Signup.svelte";
	import Home from "./Home.svelte";
	import EmailVerified from "./EmailVerified.svelte";
	import ThankYou from "./ThankYou.svelte";
	import Dashboard from "../components/Dashboard.svelte";
    import Email from "../components/Email.svelte";
	import EmailPage from "./EmailPage.svelte";

	import {Router, Route} from 'svelte-routing';
	import ProtectedRoute from '../routes/ProtectedRoute.svelte';
	import ProtectedRouteHome from '../routes/ProtectedRouteHome.svelte';
	import ProtectedRouteEmail from '../routes/ProtectedRouteEmail.svelte';
  
  </script>
  
  
<main class="container">
	<!-- <EmailPage id={3} /> -->
	<Router>
		<Route path="/" component={Signin} />
		<Route path="/signup" component={Signup} />
		<Route path="/thankyou" component={ThankYou} />
		<Route path="/emailverified" component={EmailVerified} />
		<!-- <ProtectedRoute path="/signup/emailverified" component={EmailVerified} />
		<ProtectedRoute path="/signup/thankyou" component={ThankYou} /> -->
		<Route path="/dashboard/:filter" let:params> 
			<Home filter="{params.filter}"/>
		</Route>
		<Route path="/email/:id" let:params> 
			<EmailPage id="{params.id}" />
		</Route>
	</Router>
</main>

