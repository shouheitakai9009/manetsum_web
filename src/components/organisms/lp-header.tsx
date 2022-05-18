import React, { useState, useCallback } from 'react'
import { useModal } from 'react-hooks-use-modal'
import { Button } from '@/components/atoms/button'
import { SiteLogo } from '@/components/molecules/site-logo'
import toast from '@/utilities/toaster'
import { post } from '@/services/api'
import { signin } from '@/services/signin'

export const LpHeader: React.FC = () => {

  const [whichLogin, setWhichLogin] = useState<boolean>(false)
  const [Modal, open] = useModal('root')
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const clickMembership = useCallback((whichLogin: boolean) => {
    setWhichLogin(whichLogin)
    open()
  }, [open])

  const onSubmit = useCallback(async () => {
    if (whichLogin) {
      await signin()
    } else {
      const response = await post("auth/users", { email, password })
      
    }
  }, [email, password])

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
                <div>
                  <label htmlFor="email">メールアドレス</label>
                  <input type="email" value={email} id="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="password">パスワード</label>
                  <input type="password" value={password} id="password" onChange={e => setPassword(e.target.value)} />
                </div>
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