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
			req.lang = { views_lang : 'views_en', langShortcut: 'en'};
			next();
		}
		else if (query.lang === 'kr' || query.lang === 'korean'){
			req.lang = { views_lang : 'views_kr', langShortcut: 'kr'};
			next();
		}
		else if (query.lang === 'cn' || query.lang === 'chinese'){
			req.lang = { views_lang : 'views_cn', langShortcut: 'cn'};
			next();
		}
		else {
			// Default
			req.lang = { views_lang : 'views_en', langShortcut: 'en'};
			next();
		}
	}
}