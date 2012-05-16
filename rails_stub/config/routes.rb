Sample::Application.routes.draw do
  resources :alerts
  get "diagnostics/index"
  root :to => "diagnostics#index"
end
