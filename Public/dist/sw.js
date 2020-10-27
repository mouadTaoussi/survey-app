const staticAssets = 'staticV8';
const dynamicAssets = 'dynamicV2';
const assets = [
	"index.html",
	"0f27e9b933cc50abbbba250c5f83aa12.woff2",
	"1437eef49e3db661f92cf0f35d5ed77a.ttf",
	"2831fd7223118eca3ed114f4b4c3a0db.svg",
	"3825c40fd00d9bbb76b78c9f10ba60b5.eot",
	"45132eb4e0c9c68f06e2abaab7a36875.svg",
	"5fab4ed5c3745c12c7e1e311b24424d0.woff2",
	"6554b21babf82823be1a7effca5f10fd.svg",
	"814c2c571f030686e71cb97ad8f43884.ttf",
	"8618686494a5c8092120235c28400ed4.ttf",
	"9a01a31d6767f82529dc5208960127b4.woff2",
	"9d001b45ba2817567f8255effb5eec52.svg",
	"a0b3c6d0d774520787d8fda2c3f7da55.eot",
	"a88636f4833324bf5f4cf7ec7fe2df9d.svg",
	"acdccc059cdf7b4063e94a309af2a776.woff",
	"afbdcbccd6861d9cdc38c86f721653a4.woff",
	"b66540e384a6ca58e95c7a07f81810aa.svg",
	"bundle.js",
	"computer-error.mp3",
	"e1c1a88e6228f902435efae43b42bbd0.woff",
	"e349f75541fa8d5cfda1a2fe90eb601b.svg",
	"eb99d5076e8ce45ccfa10fe778848da5.eot",
	"graphql-svg.png",
	"linkedin.png",
	"logo.png",
	"logo.svg",
	"main.css",
	"manifest.json",
	"previewID.png",
	"previewID1.png",
	"to-the-point.mp3",
	"https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Ubuntu:wght@400;500&display=swap",
	"https://fonts.googleapis.com/css2?family=Cabin&display=swap",
];

this.addEventListener('install',(e)=>{
	// precach Assets
	e.waitUntil(
		caches.open(staticAssets).then((cach)=>{
			cach.addAll(assets).then(()=>{
				console.log('precached your assets!');
			})
		})
	)
})

this.addEventListener('activate',(e)=>{
	e.waitUntil(
		caches.keys().then((keys)=>{
			const keysToDelete = keys.filter((key)=>{ 
				return key !== staticAssets && key !== dynamicAssets
			 });
			for (var i = 0; i < keysToDelete.length; i++) {
				caches.delete(keysToDelete[i])
			}
		})
	)
})

this.addEventListener('fetch',(e)=>{
	// if the request has query parameters, `hasQuery` will be set to `true`
	var hasQuery = e.request.url.indexOf('?') != -1;

	if (
		e.request.url.includes('/auth') 
					|| 
		e.request.url.includes('/response') 
					|| 
		e.request.url.includes('/question') 
					|| 
		e.request.url.includes('/api/v1')
					||
		e.request.url.includes('/surveyEditor')
	){
		console.log('POST request')
	}
	else {
		e.respondWith(
			caches.match(e.request, {
	       		// ignore query section of the URL based on our variable
				ignoreSearch: hasQuery,
	    	}).then((cach)=>{
				return cach || fetch(e.request).then((response)=>{
					caches.open(dynamicAssets).then((cach)=>{
						cach.put(e.request.url, response.clone());
						return response;
					})
				})
			})
		)
	}
})