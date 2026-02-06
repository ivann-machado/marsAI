import { useEffect, useState } from "react";
import viteLogo from '/vite.svg'
import reactLogo from '../../assets/react.svg'
import { useTranslation } from 'react-i18next';

function UploadForm(){
    const { t } = useTranslation();
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);
		 const data = {
			title: formData.get('title'),
			description: formData.get('description'),
			video: formData.get('video'),
			image: formData.get('image'),
			scenario_ai: formData.get('scenario_ai'),
			video_ai: formData.get('video_ai'),
			sound_ai: formData.get('sound_ai'),
			post_prod_ai: formData.get('post_prod_ai'),
			more_info: formData.get('more_info'),
			instagram: formData.get('instagram'),
			linkedin: formData.get('linkedin'),
			youtube: formData.get('youtube'),
		};
		console.log(data);
	};
    return(
		<div className="flex justify-center bg-black pt-4 pb-4">
			<form onSubmit={handleSubmit} className="bg-gray-800 shadow-[0px_0px_10px_2px] shadow-blue-600/75 w-9/10 rounded-md flex flex-col items-center gap-2 pt-2 pb-2">
				<h3 className="text-white">{t('upload_form.upload_message') } !</h3>
				<div className=" flex flex-col gap-2 p-2 w-9/10">
					<p className="text-purple-400">{t('upload_form.global_infos')}</p>
					<div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="title" className="text-white">{t('upload_form.title')} :</label>
							<input type="text" name="title" id="title" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="description" className="text-white">{t('upload_form.desc')} :</label>
							<input type="text" name="description" id="description" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>					
					<div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col md:max-w-4/10">
							<label htmlFor="video" className="text-white">{t('upload_form.video')} :</label>
							<input type="file" name="video" id="video" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col md:max-w-4/10">
							<label htmlFor="image" className="text-white">{t('upload_form.image')} :</label>
							<input type="file" name="image" id="image" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>
				</div>
				<div className=" flex flex-col gap-2 p-2 w-9/10">
					<p className="text-purple-400">{t('upload_form.production')}</p>
					<div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="scenario_ai" className="text-white">{t('upload_form.scenario_ai')} :</label>
							<input type="text" name="scenario_ai" id="scenario_ai" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="video_ai" className="text-white">{t('upload_form.video_ai')} :</label>
							<input type="text" name="video_ai" id="video_ai" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>					
					<div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="sound_ai" className="text-white">{t('upload_form.sound_ai')} :</label>
							<input type="text" name="sound_ai" id="sound_ai" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="post_prod_ai" className="text-white">{t('upload_form.post_prod_ai')} :</label>
							<input type="text" name="post_prod_ai" id="post_prod_ai" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>
				</div>
				<div className=" flex flex-col gap-2 p-2 w-9/10">
					<p className="text-purple-400">{t('upload_form.more_info')}</p>
					<div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="more_info" className="text-white">{t('upload_form.producer')} :</label>
							<input type="text" name="more_info" id="more_info" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="instagram" className="text-white">Instagram :</label>
							<input type="text" name="instagram" id="instagram" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>
					<div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="linkedin" className="text-white">Linkedin :</label>
							<input type="text" name="linkedin" id="linkedin" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="youtube" className="text-white">Youtube :</label>
							<input type="text" name="youtube" id="youtube" className="bg-gray-700 border border-gray-500 rounded-lg"/>
						</div>
					</div>
				</div>
				<button type="submit" className="bg-amber-300 p-2 rounded-lg md:max-w-5/10 md:hover:cursor-pointer">{t('upload_form.submit_btn')} {'>>'} </button>
        </form>
		</div>
        
    )
}

export default UploadForm;