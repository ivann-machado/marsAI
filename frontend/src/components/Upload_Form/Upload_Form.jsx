import { useEffect, useState } from "react";
import viteLogo from '/vite.svg'
import reactLogo from '../../assets/react.svg'
import { useTranslation } from 'react-i18next';

function UploadForm(){
    const { t } = useTranslation();
    return(
        <form className="bg-gray-800">
            <h3>{t('upload_form.upload_message') } !</h3>
            <div className="border border-black">
                <p>{t('upload_form.global_infos')}</p>
                <div>
                    <label htmlFor="">{t('upload_form.title')}</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
                <div>
                    <label htmlFor="">{t('upload_form.video')}</label>
                    <input type="file" name="" id="" className="border border-black rounded-lg" />
                </div>
                <div>
                    <label htmlFor="">{t('upload_form.image')}</label>
                    <input type="file" name="" id="" className="border border-black rounded-lg" />
                </div>
            </div>
            <div className="border border-black">
                <p>{t('upload_form.production')}</p>
                <div>
                    <label htmlFor="">{t('upload_form.scenario_ai')}</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
                <div>
                    <label htmlFor="">{t('upload_form.video_ai')}</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
                <div>
                    <label htmlFor="">{t('upload_form.sound_ai')}</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
                <div>
                    <label htmlFor="">{t('upload_form.post_prod_ai')}</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
            </div>
            <div className="border border-black">
                <p>{t('upload_form.production')}</p>
                <div>
                    <label htmlFor="">{t('upload_form.more_info')}</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
                <div>
                    <label htmlFor="">Instagram</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
                <div>
                    <label htmlFor="">Linkedin</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
                <div>
                    <label htmlFor="">Youtube</label>
                    <input type="text" name="" id="" className="border border-black rounded-lg" />
                </div>
            </div>
            <button type="submit" className="bg-amber-300 p-2 rounded-lg">{t('upload_form.submit_btn')} {'>>'} </button>
        </form>
    )
}

export default UploadForm;