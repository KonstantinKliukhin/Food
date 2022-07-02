import {getResource} from '../services/services';

function cards() {
    class Card {
        constructor(imageURL,imageAlt, title, text, price, parentSelector, exchangeRate) {
            this.imageURL = imageURL;
            this.imageAlt = imageAlt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parentSelector = document.querySelector(parentSelector);
            this.exchangeRate = exchangeRate;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = Math.round(this.price * this.exchangeRate);
        }

        buildingCard() {
            const card = document.createElement('div'),
                  cardWrapper = this.parentSelector;
            card.classList.add('menu__item');
            card.innerHTML = `<img src = "${this.imageURL}" alt = "${this.imageAlt}">
                              <h3 class = "menu__item-subtitle">${this.title}</h3>
                              <div class = "menu__item-descr">${this.text}</div>
                              <div class = "menu__item-divider"></div>
                              <div class = "menu__item-price">
                                <div class = "menu__item-cost">Цена</div>
                                <div class = "menu__item-total">
                                    <span>${this.price}</span>
                                    грн/день
                                </div>
                              </div>`;
            cardWrapper.append(card);
        }
    }

    // axios.get('http://localhost:3000/menu')
        // .then(data => {
        //     data.data.forEach(({img, altimg, title, descr, price}) => {
        //         new Card(img, altimg, title, descr, price, '.menu .container').buildingCard();
        //     })
        // })
        // .catch(() => )


    const menu = [
        {
          "img": "img/tabs/vegy.jpg",
          "altimg": "vegy",
          "title": "Меню 'Фитнес'",
          "descr": "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
          "price": 9
        },
        {
          "img": "img/tabs/post.jpg",
          "altimg": "post",
          "title": "Меню 'Постное'",
          "descr": "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
          "price": 14
        },
        {
          "img": "img/tabs/elite.jpg",
          "altimg": "elite",
          "title": "Меню 'Премиум'",
          "descr": "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
          "price": 21
        }
      ]

      axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then(rate => rate.data)
        .then(rate => rate.find(item => item.cc === 'USD').rate)
        .then(rate => menu.forEach(({img, altimg, title, descr, price}) => {
            new Card(
                        img, 
                        altimg, 
                        title, 
                        descr, 
                        price, 
                        '.menu .container', 
                        rate
                    ).buildingCard();
        }))
        .catch(e => console.log(e))
      

}

export default cards;