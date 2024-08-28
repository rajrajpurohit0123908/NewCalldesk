import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [role, setRole] = useState(null);
    const [BranchCode, setBranchCode] = useState(null);
    const [BranchName, setBranchName] = useState(null);
    const [RegionCode, setRegionCode] = useState(null);
    const [RegionName, setRegionName] = useState(null);
    const [LastPasswordChangedDate, setLastPasswordChangedDate] = useState(null);
    const [PasswordChangeDaysAllowed, setPasswordChangeDaysAllowed] = useState(null);
    const [UserName, setUserName] = useState(null);
    const [OfficeType, setOfficeType] = useState(null);
    const [UserLastLogin, setUserLastLogin] = useState(null);
    const [UserLastLogOut, setUserLastLogOut] = useState(null);
    const [LocationTypeID, setLocationTypeID] = useState(null);

    useEffect(() => {
        // Example: Check for a token in localStorage to set authentication status
       
        setIsAuthenticated(false);
    }, []);

    const login = (name,email,role,BranchCode,BranchName,RegionCode,RegionName,LastPasswordChangedDate,PasswordChangeDaysAllowed,UserName,OfficeType,UserLastLogin,UserLastLogOut,LocationTypeID) => {
        setIsAuthenticated(true);
       setName(name);
       setEmail(email);
       setRole(role);
       setBranchCode(BranchCode);
       setBranchName(BranchName);
       setRegionCode(RegionCode);
       setRegionName(RegionName);
       setLastPasswordChangedDate(LastPasswordChangedDate);
       setPasswordChangeDaysAllowed(PasswordChangeDaysAllowed);
       setUserName(UserName);
       setOfficeType(OfficeType);
       setUserLastLogin(UserLastLogin);
       setUserLastLogOut(UserLastLogOut);
       setLocationTypeID(LocationTypeID);
        
    };

    const logout = () => {
        setIsAuthenticated(false);
        setName(null);
       setEmail(null);
       setRole(null);
       setBranchCode(null);
       setBranchName(null);
       setRegionCode(null);
       setRegionName(null);
       setLastPasswordChangedDate(null);
       setPasswordChangeDaysAllowed(null);
       setUserName(null);
       setOfficeType(null);
       setUserLastLogin(null);
       setUserLastLogOut(null);
       setLocationTypeID(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, name,email,role,BranchCode,BranchName,RegionCode,RegionName,LastPasswordChangedDate,PasswordChangeDaysAllowed,UserName,OfficeType,UserLastLogin,UserLastLogOut, login, logout,LocationTypeID }}>
            {children}
        </AuthContext.Provider>
    );
};
