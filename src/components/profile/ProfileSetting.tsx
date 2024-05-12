import React, { useState } from "react";
import { Profile } from "../../queries/getProfile";
import styled from "styled-components";
import { usePutPassword } from "../../queries/putPassword";
import { useForm } from "react-hook-form";
import { getUserInfo } from "../../utils/localStorage";

interface ProfileSettingProps {
    info: Profile;
}

interface FormData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;

    email: string;
}

export default function ProfileSetting({ info }: ProfileSettingProps) {
    const { mutateAsync: putPassword } = usePutPassword();
    const { register, handleSubmit, watch, reset } = useForm<FormData>();
    const userInfo = getUserInfo();

    const handleBtn = async (data: FormData) => {
        console.log(data);

        try {
            await putPassword({ ...data, email: "rudfls114@naver.com" });
            // reset(); // Reset form after successful password change
        } catch (error) {
            // Handle error here
            console.error("Error changing password:", error);
        }
    };

    const onSubmit = async (data: FormData) => {
        console.log(data);

        if (data.newPassword !== data.confirmNewPassword) {
            alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            await putPassword({
                email: userInfo.email,
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            });
            reset(); // Reset form after successful password change
        } catch (error) {
            // Handle error here
            console.error("Error changing password:", error);
        }
        // 여기서 비밀번호 변경 요청을 서버로 보내는 로직을 추가하세요.
        // 성공적으로 변경되면 사용자에게 알리는 등의 작업을 수행할 수 있습니다.
        alert("비밀번호가 성공적으로 변경되었습니다.");
    };

    return (
        <Wrap>
            <Cont>
                <h2>내 프로필</h2>
                <Box>
                    <Title>닉네임</Title>
                    <span>{info.nick}</span>
                </Box>
                <Box>
                    <Title>이메일</Title>
                    <span>{info.email}</span>
                </Box>
            </Cont>
            <Cont>
                <h2>계정 정보 변경</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box>
                        <Label>현재 비밀번호</Label>
                        <Inp
                            type="password"
                            id="oldPassword"
                            {...register("oldPassword")}
                        />
                        {/* {errors.oldPassword && (
                            <span>현재 비밀번호를 입력하세요.</span>
                        )} */}
                    </Box>
                    <Box>
                        <Label>새 비밀번호</Label>
                        <Inp type="password" {...register("newPassword")} />
                        {/* {errors.newPassword && (
            <span>새 비밀번호를 입력하세요.</span>
        )} */}
                        {/* {errors.confirmNewPassword && (
            <span>{errors.confirmNewPassword.message}</span>
        )} */}
                    </Box>

                    <Box>
                        <Label>새 비밀번호 확인</Label>
                        <Inp
                            type="password"
                            id="confirmNewPassword"
                            {...register("confirmNewPassword")}
                            // {
                            //     required: true,
                            //     validate: (value: string) =>
                            //         value === watch("newPassword") ||
                            //         "새 비밀번호와 일치하지 않습니다.",
                            // })}
                        />
                        <Btn type="submit">수정</Btn>
                    </Box>
                </form>
            </Cont>
        </Wrap>
    );
}

export const Wrap = styled.div`
    width: 970px;
    height: 680px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
    padding: 28px 31px;
    margin-top: 25px;
`;

export const Cont = styled.div`
    ${"h2"} {
        font-size: 18px;
        font-family: KoPubWorldDotum_Pro;
        font-weight: 700;
    }
    margin-bottom: 67px;
`;

export const Box = styled.div`
    display: flex;
    margin: 16px 0;
    align-items: center;
`;

export const Label = styled.label`
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #8f8f8f;
    width: 137px;
`;

export const Title = styled.p`
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #8f8f8f;
    width: 137px;
`;

export const Inp = styled.input`
    width: 248px;
    height: 28px;
    flex-shrink: 0;
    border-radius: 25px;
    border: 1px solid #d9d9d9;
    padding: 0 15px;
`;

export const Btn = styled.button`
    width: 56px;
    height: 28px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #2c9b36;
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-family: KoPubWorldDotum_Pro;
    font-weight: 700;
    margin: 0 16px;
`;
