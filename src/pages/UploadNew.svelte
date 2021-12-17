<script>
	let email = 'user6@business.com'
	let password = 'password'
	let result = null
	
	async function signin  () {
		const res = await fetch('http://localhost:4000/uploads/new', {
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
		result = JSON.stringify(json)
        console.log(result)
	}
</script>

<p>
	Result:
</p>
<pre>
{result}
</pre>