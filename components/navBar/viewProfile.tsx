import { Button, Modal } from 'react-bootstrap'
import utilStyles from '../../styles/utils.module.css'
import EditProfile from './editProfile'
import { useState } from 'react'
import { Img } from 'react-image';
import navbar from '../../styles/navbar.module.css'


export default function ViewProfile(props) {
    const [editProfilePopShow, setEditProfilePopShow] = useState(false);

    const show = props.viewProfileShow;
    const json = props.viewProfileResult.User;
    const handleClose = () => { props.setViewProfileShow(false) };
    const hundleEditProfile = () => {
        props.setViewProfileShow(false)
        setEditProfilePopShow(true)
    };

    return (
        <>
            < Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className={utilStyles.text5} >お名前(姓)</div>
                    <span className={utilStyles.text7}>{json.familyName}</span>
                    <div className={utilStyles.text5} >お名前(名)</div>
                    <span className={utilStyles.text7}> {json.firstName}</span>
                    <div className={utilStyles.text5} >ニックネーム</div>
                    <span className={utilStyles.text7}>{json.nickName}</span>
                    <div className={utilStyles.text5} >プロフィール画像</div>
                    <span><Img className={navbar.editProfileImageUrl} src={json.imageUrl} /></span>
                    <div className={utilStyles.text5} >自己紹介文</div>
                    <span className={utilStyles.text7}>{json.profileText}</span>
                    <div className={utilStyles.text5} >Email</div>
                    <span className={utilStyles.text7}>{json.email}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => hundleEditProfile()}>
                        編集
                    </Button>
                </Modal.Footer>
            </Modal >
            <EditProfile
                editProfilePopShow={editProfilePopShow}
                setEditProfilePopShow={setEditProfilePopShow}
                setLoginStatus={props.setLoginStatus}
                setViewProfileShow={props.setViewProfileShow}
                viewProfileResult={props.viewProfileResult}></EditProfile>
        </>
    )
}