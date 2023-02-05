import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Popup from "./Popup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoToolTip from "./InfoToolTip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Api from "../utils/Api";
import Auth from "../utils/Auth";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import smthWrong from "../image/smthWrong.svg";
import AllOk from "../image/AllOK.svg";

function App() {
  const smthWrongText = "Что-то пошло не так! Попробуйте ещё раз.";
  const allOkText = "Вы успешно зарегистрировались!";
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isToolTipPopupOpen, setIsToolTipPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [toolTipSrc, setToolTipSrc] = React.useState(smthWrong);
  const [toolTipText, setToolTipText] = React.useState(smthWrongText);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletingCard, setDeletingCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [myMail, setMyMail] = React.useState(false);
  let history = useHistory();

  React.useEffect(() => {
    Promise.all([Api.getUserInfo(), Api.getInitialCards()])
      .then(([user, initialCards]) => {
        setCurrentUser(user);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    const сheckToken = () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        Auth.getMe(jwt)
          .then((res) => {
            if (res?.data?.email) {
              setMyMail(res.data.email);
              setLoggedIn(true);
              history.push("/");
            } else {
              logOut();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    сheckToken();
  }, [history]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    Api.toggleLikes(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setDeletingCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name });
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsImagePopupOpen(false);
    setDeletingCard({});
    setIsToolTipPopupOpen(false);
  }
  function handleUpdateUser({ name, about }) {
    Api.setUserInfo(name, about)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    Api.editAvatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    Api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteConfirm() {
    Api.deleteCard(deletingCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== deletingCard._id;
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then(() => {
        setToolTipSrc(AllOk);
        setToolTipText(allOkText);
        setIsToolTipPopupOpen(true);
        history.push("/signin");
      })
      .catch((error) => {
        setToolTipSrc(smthWrong);
        setToolTipText(smthWrongText);
        setIsToolTipPopupOpen(true);
        console.log(error);
      });
  }

  function handleLogin(email, password) {
    Auth.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/");
          return res;
        }
      })
      .catch((error) => {
        setToolTipSrc(smthWrong);
        setToolTipText(smthWrongText);
        setIsToolTipPopupOpen(true);
        console.log(error);
      });
  }

  function logOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Popup
          component={EditProfilePopup}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <Popup
          component={EditAvatarPopup}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <Popup
          component={AddPlacePopup}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <Popup
          component={ConfirmPopup}
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleDeleteConfirm}
        />
        <Popup
          component={InfoToolTip}
          name="info"
          src={toolTipSrc}
          text={toolTipText}
          isOpen={isToolTipPopupOpen}
          onClose={closeAllPopups}
        />
        <Popup
          component={ImagePopup}
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <Switch>
          <Route path="/sign-in">
            <Header
              linkText="Регистрация"
              linkLink="/sign-up"
              showEmail={false}
              logOut={logOut}
            />
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Header
              linkText="Войти"
              linkLink="/sign-in"
              showEmail={false}
              logOut={logOut}
            />
            <Register onRegister={handleRegister} />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            path="/"
            exact
            component={Main}
          >
            <Header
              linkText="Выйти"
              showExit={loggedIn}
              showEmail={true}
              myMail={myMail}
              logOut={logOut}
            />
          </ProtectedRoute>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
