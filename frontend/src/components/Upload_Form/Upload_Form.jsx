import { useEffect, useState } from "react";
import viteLogo from '/vite.svg'
import reactLogo from '../../assets/react.svg'
import { useTranslation } from 'react-i18next';

function UploadForm(){
    return(
        <form>
            <div>
                <label htmlFor="">Titre</label>
                <input type="text" name="" id="" className="border border-black rounded-lg" />
            </div>
            <div>
                <label htmlFor="">Durée</label>
                <input type="text" name="" id="" className="border border-black rounded-lg" />
            </div>
            <div>
                <label htmlFor="">Image</label>
                <input type="file" name="" id="" className="border border-black rounded-lg" />
            </div>
            <div>
                <label htmlFor="">IA scénario</label>
                <input type="text" name="" id="" className="border border-black rounded-lg" />
            </div>
            <div>
                <label htmlFor="">IA générative vidéo</label>
                <input type="text" name="" id="" className="border border-black rounded-lg" />
            </div>
            <div>
                <label htmlFor="">IA sons et musiques</label>
                <input type="text" name="" id="" className="border border-black rounded-lg" />
            </div>
            <div>
                <label htmlFor="">IA post-production</label>
                <input type="text" name="" id="" className="border border-black rounded-lg" />
            </div>
            <div>
                <label htmlFor="">Producteur</label>
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
            <button type="submit">Valider</button>
        </form>
    )
}

export default UploadForm;