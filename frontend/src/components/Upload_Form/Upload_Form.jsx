import { useEffect, useState } from "react";
import viteLogo from '/vite.svg'
import reactLogo from '../../assets/react.svg'
import { useTranslation } from 'react-i18next';

function UploadForm(){
    const { t } = useTranslation();
    return(
		<div className="flex justify-center bg-black pt-4 pb-4">
			<form className="bg-gray-800 shadow-[0px_0px_10px_2px] shadow-blue-600/75 w-9/10 rounded-md flex flex-col items-center gap-2 pt-2 pb-2">
				<h3 className="text-white">{t('upload_form.upload_message') } !</h3>
				<div className="border border-red-500 flex flex-col gap-2 p-2 w-9/10">
					<p className="text-purple-800">{t('upload_form.global_infos')}</p>
					<div className="border border-red-400 flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">{t('upload_form.title')} :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">{t('upload_form.desc')} :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>					
					<div className="border border-red-400 flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col md:max-w-4/10">
							<label htmlFor="" className="text-white">{t('upload_form.video')} :</label>
							<input type="file" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col md:max-w-4/10">
							<label htmlFor="" className="text-white">{t('upload_form.image')} :</label>
							<input type="file" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>
				</div>
				<div className="border border-red-500 flex flex-col gap-2 p-2 w-9/10">
					<p className="text-white">{t('upload_form.production')}</p>
					<div className="border border-red-400 flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">{t('upload_form.scenario_ai')} :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">{t('upload_form.video_ai')} :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>					
					<div className="border border-red-400 flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">{t('upload_form.sound_ai')} :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">{t('upload_form.post_prod_ai')} :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>
				</div>
				<div className="border border-red-500 flex flex-col gap-2 p-2 w-9/10">
					<p className="text-white">{t('upload_form.more_info')}</p>
					<div className="border border-red-400 flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">{t('upload_form.producer')} :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">Instagram :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>
					<div className="border border-red-400 flex flex-col md:flex-row md:justify-evenly md:p-2">
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">Linkedin :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
						<div className="flex flex-col">
							<label htmlFor="" className="text-white">Youtube :</label>
							<input type="text" name="" id="" className="bg-gray-700 border border-gray-500 rounded-lg" />
						</div>
					</div>
				</div>
				<button type="submit" className="bg-amber-300 p-2 rounded-lg md:max-w-5/10">{t('upload_form.submit_btn')} {'>>'} </button>
        </form>
		</div>
        
    )
}

export default UploadForm;