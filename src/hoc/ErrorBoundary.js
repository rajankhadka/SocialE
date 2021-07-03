import React,{Component} from 'react';

//react router dom
import { withRouter,Redirect } from 'react-router-dom';

class ErrorBoundary extends Component{

    constructor(props){
        super(props);
        this.state = {
            hasError:false
        }
    }

    static getDerivedStateFromError(error){
        console.log("error")
        return {hasError:true}
    }

    componentDidMount(){

    }

    componentDidCatch(){
        console.log("error");
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        // console.log(this.props);
        // this.props.history.replace('/login')
    }

    render(){
        if(this.state.hasError){
            return  <Redirect to="/login" />
        }
        return this.props.children
    }
}

export default withRouter(ErrorBoundary);