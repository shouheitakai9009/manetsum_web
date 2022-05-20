import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModal } from 'react-hooks-use-modal'
import { Button } from '@/components/atoms/button'
import { SiteLogo } from '@/components/molecules/site-logo'
import toast from '@/utilities/toaster'
import { signin, signup } from '@/services/auth'

export const LpHeader: React.FC = () => {

  const navigate = useNavigate()
  const [whichLogin, setWhichLogin] = useState<boolean>(false)
  const [Modal, open] = useModal('root')
  const [nickname, setNickname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [repassword, setRepassword] = useState<string>("")

  const clickMembership = useCallback((whichLogin: boolean) => {
    setWhichLogin(whichLogin)
    open()
  }, [open])

  const onSubmit = useCallback(async () => {
    const user = whichLogin ? await signin(email, password) : await signup(email, nickname, password, repassword)
    if (!user) {
      toast().error(`${whichLogin ? "ログイン" : "会員登録"}ログインに失敗しました`)
      return
    }
    toast().success(`${whichLogin ? "ログイン" : "会員登録"}ログインに成功しました`)
    navigate("/mypage")
  }, [whichLogin, email, nickname, password, repassword, navigate])

  return (
    <section>
      <div className="o-lp-header--top">
        <div className="o-lp-header--inner">
          <h1 className="o-lp-header--top--description">ツムツムのコイン稼ぎ管理と使用キャラの自己紹介カードがすぐ作れちゃうのは【manetsum】だけ！</h1>
        </div>
      </div>
      <header className="o-lp-header">
        <section className="o-lp-header--inner o-lp-header--flexbox">
          <SiteLogo />
          <section>
            <div style={{ display: 'flex' }}>
              <Button text='ログイン' onClick={() => clickMembership(true)} />
              &nbsp;
              <Button text='会員登録' onClick={() => clickMembership(false)} />
            </div>
            <Modal>
              <section className="t-standard-modal--content">
                <h1>{whichLogin ? "サインイン" : "サインアップ"}</h1>
                {
                  !whichLogin && <div>
                    <label htmlFor="nickname">ニックネーム</label>
                    <input type="nickname" value={nickname} id="nickname" onChange={e => setNickname(e.target.value)} />
                  </div>
                }
                <div>
                  <label htmlFor="email">メールアドレス</label>
                  <input type="email" value={email} id="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="password">パスワード</label>
                  <input type="password" value={password} id="password" onChange={e => setPassword(e.target.value)} />
                </div>
                {
                  !whichLogin && <div>
                    <label htmlFor="repassword">パスワード（確認用）</label>
                    <input type="password" value={repassword} id="repassword" onChange={e => setRepassword(e.target.value)} />
                  </div>
                }
                <Button text={whichLogin ? "ログインする" : "会員登録する"} onClick={onSubmit} />
              </section>
            </Modal>
          </section>
        </section>
      </header>
      {toast().render()}
    </section>
  )
}