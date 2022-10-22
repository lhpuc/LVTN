import axiosClient from "../../helpers/axios";

export const NavbarOption = {
    getOptionNavbar: () =>{
        return axiosClient.get('/')
    }
}