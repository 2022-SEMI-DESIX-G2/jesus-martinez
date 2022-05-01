((Utils) => {
    const App = {
        htmlElements: {
            form: document.querySelector('#fibonacci'),
            input: document.querySelector('#number'),
            response: document.querySelector('#response') 
        },
        init: () => {
            App.htmlElements.form.addEventListener('submit',App.handlers.onFormSubmit)
            App.htmlElements.response.addEventListener('click',App.handlers.onCardClick)
        },
        utils: {
            ...Utils.methods
        },
        templates: {
            card: (n) => {
                return `<div class="card-num">
                            <div class="x">x</div>
                            <div class="container-numero"><h5>${n}</h5></div>
                        </div>`
            }
        },
        handlers: {
            onFormSubmit: (e) => {
                e.preventDefault()

                App.htmlElements.response.innerHTML = ''

                const number = App.htmlElements.input.value

                App.utils.fibonacci(number).forEach(value => {
                    App.htmlElements.response.innerHTML += App.templates.card(value);
                });
            },
            onCardClick: (e) => {
                if(e.target.className === 'x') {
                    e.target.parentNode.remove();
                }
                console.log(e)
            }
        }
    }
    App.init()
})(document.Utils)