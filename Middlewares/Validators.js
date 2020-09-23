module.exports = {
	// validateQuestions : (req,res,next)=>{

	// },
	// validateSubmittedResponse : (req,res,next)=>{

	// },
	// This middleware comes first before all middlewares ! ! ! 
	// For let other middlewares decide which kanguage should be rendered or redirected to
	checkLanguage : (req,res,next)=>{
		// Get specefied language from the query in irl
		const query = req.query;
		// Check which language defined
		if (query.lang === 'en' || query.lang === 'english'){
			req.lang = { langPages : 'pages', langShortcut: 'en'};
			next();
		}
		else if (query.lang === 'kr' || query.lang === 'korean'){
			req.lang = { langPages : 'koreanPages', langShortcut: 'kr'};
			next();
		}
		else if (query.lang === 'cn' || query.lang === 'chinese'){
			req.lang = { langPages : 'chinesePages', langShortcut: 'cn'};
			next();
		}
		else {
			req.lang = { langPages : 'pages', langShortcut: 'en'};
			next();
		}
	}
}