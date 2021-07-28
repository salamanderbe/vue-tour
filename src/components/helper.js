import axios from 'axios';

export const getVideoBlob = async (url) => {
	if (url.includes('http')) {
		const promise = new Promise((resolve, reject) => {
			axios.get(url, {
				responseType: 'blob',
			}).then((response) => {
				const result = response.data;
				resolve(result);
			}).catch(() => {
				reject(new Error('Error When Downloading Video or Media not found'));
			});
		});
		return promise;
	}
};