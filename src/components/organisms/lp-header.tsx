import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { useModal } from 'react-hooks-use-modal'
import { Button } from '@/components/atoms/button'
import { SiteLogo } from '@/components/molecules/site-logo'
import toast from '@/utilities/toaster'

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
    const response = await axios.post("http://127.0.0.1:8000/api/auth/token/login", {
      email,
      password
    }).catch(({ response }) => {
      switch (response.status) {
        case 400: {
          toast().error(response.data.non_field_errors[0])
          break
        }
        default: {
          toast().warning(`訳のわからないエラーが出たよ！statusは${response.status}らしいよ！`)
          break
        }
      }
    })
    if (!response) return
    if (response.status === 200) {
      toast().success("ログインに成功しました！おかえり！")
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